// A theme bundles all player-facing words and result icons in one place,
// so adding a new look is just adding a new object here — no component changes.
export interface GameTheme {
    name: string;
    labels: {
        aiming: string;
        enemyAttacking: string;
        enemyWaters: string;
        yourFleet: string;
    };
    icons: {
        hit: string;
        miss: string;
    };
    // Tailwind text-size classes applied to grid cell icons. Emojis fill their
    // font box differently (🔥 is drawn larger than 🐼), so themes can compensate here.
    // Must be complete class names — Tailwind only generates classes it finds
    // written out in full somewhere in the source.
    iconClass: string;
}

export const CLASSIC_THEME: GameTheme = {
    name: 'Classic',
    labels: {
        aiming: 'Shoot now!..',
        enemyAttacking: 'Enemy Attacking...',
        enemyWaters: '🎯 Enemy Waters',
        yourFleet: '🚢 Your Fleet',
    },
    icons: {
        hit: '🔥',
        miss: 'O',
    },
    iconClass: 'text-lg sm:text-xl',
};

export const PANDA_THEME: GameTheme = {
    name: 'Panda',
    labels: {
        aiming: 'Search now!..',
        enemyAttacking: 'Rival panda turn...',
        enemyWaters: '🎯 Rival pandas',
        yourFleet: '🐼 Your Pandas',
    },
    icons: {
        hit: '🐼',
        miss: '🎋',
    },
    iconClass: 'text-2xl sm:text-3xl',
};

export const THEMES: GameTheme[] = [CLASSIC_THEME, PANDA_THEME];