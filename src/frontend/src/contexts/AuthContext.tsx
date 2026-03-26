import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, isInitializing } = useInternetIdentity();
  const { actor, isFetching: isActorFetching } = useActor();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isInitializing || isActorFetching || !actor) return;

    if (!identity || identity.getPrincipal().isAnonymous()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    // eslint-disable-next-line
    const typedActor = actor as any;

    (async () => {
      try {
        const meResult = await typedActor.getMe();
        if (cancelled) return;

        if (meResult && "ok" in meResult) {
          setUser(meResult.ok as User);
        } else {
          const principalText = identity.getPrincipal().toString();
          const shortName = principalText.slice(0, 8);
          const createResult = await typedActor.createUser(shortName, "");
          if (cancelled) return;
          if (createResult && "ok" in createResult) {
            setUser(createResult.ok as User);
            // Fire-and-forget: increment user count on new signup
            try {
              typedActor.incrementUserCount();
            } catch (e) {
              console.error("incrementUserCount error:", e);
            }
          }
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [identity, isInitializing, actor, isActorFetching]);

  const logout = useCallback(() => {
    clear();
    setUser(null);
  }, [clear]);

  const isAuthenticated =
    !!user && !!identity && !identity.getPrincipal().isAnonymous();

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading: isLoading || isInitializing,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, isInitializing, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
