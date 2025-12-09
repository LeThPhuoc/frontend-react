import { useEffect, useRef, RefObject } from 'react';

export const useClickOutside = <T extends HTMLElement>(handler: (event: MouseEvent) => void): RefObject<T | null> => {
    const ref = useRef<T>(null);
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [handler]);

    return ref;
}
