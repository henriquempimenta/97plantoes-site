import { useId } from 'react';

// Formas da logo 97 Plantões (viewBox 0 0 1000 1000). As animações ficam em
// index.css, nas classes .logo97.v-<variante>, e agem sobre os grupos
// .n9, .n7, .cross e .ch (cada letra de PLANTÕES, com --i em ordem).

const P9 = 'M 350 166 H 451.9 A 51 51 0 0 0 436 203 V 258 A 12 12 0 0 1 424 270 H 366 A 51 51 0 0 0 315 321 V 365 A 51 51 0 0 0 366 416 H 424 A 12 12 0 0 1 436 428 V 483 A 51 51 0 0 0 487 534 H 533 A 51 51 0 0 0 565 522.7 V 624 C 565 708 498 772 414 772 H 322 C 262 772 214 736 206 694 C 202 673 211 655 228 645 L 260 628 C 278 618 297 624 309 641 L 318 654 C 326 665 337 671 352 671 H 398 C 429 671 452 648 452 617 V 576 C 452 548 431 526 403 526 H 346 C 265 526 199 460 199 379 V 317 C 199 234 267 166 350 166 Z';
const P7 = 'M 568.1 166 H 729 C 779 166 819 206 819 256 V 348 C 819 368 815 388 807 407 L 665 734 C 655 757 633 772 608 772 H 482 C 528 748 560 708 580 662 L 689 405 A 51 51 0 0 0 709 365 V 321 A 51 51 0 0 0 658 270 H 596 A 12 12 0 0 1 584 258 V 203 A 51 51 0 0 0 568.1 166 Z';
const CROSS = 'M 487 171 H 533 A 32 32 0 0 1 565 203 V 289 H 658 A 32 32 0 0 1 690 321 V 365 A 32 32 0 0 1 658 397 H 565 V 483 A 32 32 0 0 1 533 515 H 487 A 32 32 0 0 1 455 483 V 397 H 366 A 32 32 0 0 1 334 365 V 321 A 32 32 0 0 1 366 289 H 455 V 203 A 32 32 0 0 1 487 171 Z';
const ECG = 'M200 830 H395 L410 818 L424 830 H446 L462 768 L481 884 L496 810 L508 830 H540 L556 816 L572 830 H800';

const LETTERS = [
  'M 217 819 H 238.5 C 248.5 819 255.5 825.5 255.5 835 C 255.5 844.5 248.5 851 238.5 851 H 223.5 V 868 H 217 V 819 Z M 223.5 825.2 V 844.8 H 238 C 244.5 844.8 249 840.8 249 835 C 249 829.2 244.5 825.2 238 825.2 H 223.5 Z',
  'M 296 819 H 302.5 V 861.8 H 330 V 868 H 296 V 819 Z',
  'M 382.2 819 H 388.3 L 410.5 868 H 403.5 L 398.3 856.2 H 372.2 L 367 868 H 360 L 382.2 819 Z M 385.25 826.8 L 374.8 850.2 H 395.7 L 385.25 826.8 Z',
  'M 448 819 H 454.2 L 483.5 856.8 V 819 H 490 V 868 H 484.2 L 454.5 829.8 V 868 H 448 V 819 Z',
  'M 528 819 H 567 V 825.2 H 550.75 V 868 H 544.25 V 825.2 H 528 V 819 Z',
  'M 624.5 818.5 C 638.5 818.5 649 829.5 649 843.5 C 649 857.5 638.5 868.5 624.5 868.5 C 610.5 868.5 600 857.5 600 843.5 C 600 829.5 610.5 818.5 624.5 818.5 Z M 624.5 824.7 C 614.3 824.7 606.7 832.9 606.7 843.5 C 606.7 854.1 614.3 862.3 624.5 862.3 C 634.7 862.3 642.3 854.1 642.3 843.5 C 642.3 832.9 634.7 824.7 624.5 824.7 Z M 612 812.5 C 613.2 807.2 616.5 805 620.2 805 C 622.8 805 624.8 806.2 627 807.5 C 628.8 808.6 630.2 809.3 631.8 809.3 C 633.8 809.3 635.2 808 635.8 805.5 L 639.5 806.5 C 638.3 811.5 635.2 813.8 631.5 813.8 C 628.8 813.8 626.8 812.6 624.5 811.2 C 622.6 810.1 621.2 809.4 619.6 809.4 C 617.6 809.4 616.2 810.7 615.6 813.3 Z',
  'M 689 819 H 725 V 825.2 H 695.5 V 840.4 H 721 V 846.6 H 695.5 V 861.8 H 726 V 868 H 689 V 819 Z',
  'M 760 859.5 L 764.2 854.5 C 768.2 859.2 773.2 862.3 779.2 862.3 C 785.5 862.3 789.8 859.2 789.8 854.8 C 789.8 850.2 785.8 848.2 776.8 846.2 C 765.8 843.8 760.8 839.8 760.8 832.2 C 760.8 824.2 767.5 818.5 777.5 818.5 C 784.8 818.5 790.5 820.8 794.8 824.8 L 790.8 830 C 786.8 826.5 782.2 824.7 777.2 824.7 C 771.2 824.7 767.3 827.6 767.3 831.6 C 767.3 836.2 771.5 838 780.5 840 C 791.2 842.4 796.3 846.6 796.3 854.2 C 796.3 862.8 789.2 868.5 778.8 868.5 C 770.2 868.5 764.2 865.2 760 859.5 Z',
];

export type LogoVariant = 'static' | 'montagem' | 'batimento' | 'traco' | 'brilho' | 'carregando';

// 'full': símbolo + PLANTÕES · 'symbol': só o 97 com a cruz · 'cross': só a cruz
type Crop = 'full' | 'symbol' | 'cross';

const VIEWBOX: Record<Crop, string> = {
  full: '170 140 660 750',
  symbol: '180 145 660 650',
  cross: '300 140 420 410',
};

export function Logo97({
  variant = 'static',
  crop = 'full',
  className,
  title = '97 Plantões',
}: {
  variant?: LogoVariant;
  crop?: Crop;
  className?: string;
  title?: string;
}) {
  // ids únicos por instância, sem caracteres especiais (vão dentro de url(#…))
  const uid = 'l' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `${uid}-${name}`;
  const ref = (name: string) => `url(#${id(name)})`;
  const viewBox = variant === 'carregando' ? '180 145 660 760' : VIEWBOX[crop];
  const showSymbol = crop !== 'cross';
  const showText = crop === 'full' || variant === 'carregando';

  return (
    <svg
      className={`logo97 v-${variant} ${className ?? ''}`}
      viewBox={viewBox}
      role="img"
      aria-label={title}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={id('shadow-main')} x="-100" y="-100" width="1250" height="1250" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#0B2E4F" floodOpacity="0.14" />
        </filter>
        <filter id={id('shadow-cross')} x="-150" y="-150" width="1300" height="1300" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0B2E4F" floodOpacity="0.12" />
        </filter>
        <linearGradient id={id('grad-9')} x1="250" y1="166" x2="450" y2="772" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#62E8F8" /><stop offset="45%" stopColor="#3AAADF" /><stop offset="100%" stopColor="#1761A6" />
        </linearGradient>
        <linearGradient id={id('grad-7')} x1="720" y1="166" x2="550" y2="772" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#62E8F8" /><stop offset="48%" stopColor="#3BAADF" /><stop offset="100%" stopColor="#2276B5" />
        </linearGradient>
        <linearGradient id={id('grad-cross')} x1="380" y1="171" x2="620" y2="515" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4F58" /><stop offset="50%" stopColor="#E11F37" /><stop offset="100%" stopColor="#B10621" />
        </linearGradient>
        <linearGradient id={id('grad-text')} x1="500" y1="805" x2="500" y2="869" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D6398" /><stop offset="100%" stopColor="#104271" />
        </linearGradient>
        <linearGradient id={id('grad-shine')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <path id={id('cross-base')} d={CROSS} />
        <clipPath id={id('clip97')}>
          <path d={P9} />
          <path d={P7} />
        </clipPath>
      </defs>

      {showSymbol && (
        <g className="sym" filter={ref('shadow-main')}>
          <g className="n9"><path d={P9} fill={ref('grad-9')} /></g>
          <g className="n7"><path d={P7} fill={ref('grad-7')} /></g>
          {variant === 'brilho' && (
            <g clipPath={ref('clip97')}>
              <g transform="skewX(-18)">
                <rect className="shine" x="-120" y="150" width="240" height="640" fill={ref('grad-shine')} />
              </g>
            </g>
          )}
        </g>
      )}

      {variant === 'batimento' && (
        <g className="ring">
          <use href={`#${id('cross-base')}`} fill="none" stroke="#E11F37" strokeWidth="8" />
        </g>
      )}

      <g className="cross" filter={ref('shadow-cross')}>
        <use href={`#${id('cross-base')}`} fill="none" stroke="#EDF0F3" strokeWidth="36" strokeLinejoin="round" />
        <use href={`#${id('cross-base')}`} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="20" />
        <use href={`#${id('cross-base')}`} fill={ref('grad-cross')} />
      </g>

      {showText && (
        <g className="txt" fill={ref('grad-text')} fillRule="evenodd">
          {LETTERS.map((d, i) => (
            <g key={i} className="ch" style={{ ['--i' as string]: i }}>
              <path d={d} />
            </g>
          ))}
        </g>
      )}

      {variant === 'traco' && (
        <>
          <path className="line" pathLength={1} stroke="#3AAADF" d={P9} />
          <path className="line" pathLength={1} stroke="#2276B5" d={P7} />
          <path className="line" pathLength={1} stroke="#E11F37" d={CROSS} />
        </>
      )}

      {variant === 'carregando' && (
        <>
          <path className="ecg-base" d={ECG} />
          <path className="ecg" pathLength={1} d={ECG} />
        </>
      )}
    </svg>
  );
}

// Tela de carregamento com a variante "Carregando" sobre o azul da marca.
export function LogoLoader({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <div className="w-28 h-28 rounded-[28px] bg-ink grid place-items-center shadow-xl shadow-ink/20">
        <Logo97 variant="carregando" className="w-[78%] h-[78%]" title="" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
