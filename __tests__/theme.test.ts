import { greenTheme } from '../src/theme/themes/greenTheme';
import { blueTheme } from '../src/theme/themes/blueTheme';
import { darkTheme } from '../src/theme/themes/darkTheme';
import { typography } from '../src/theme/typography';
import { spacing } from '../src/theme/spacing';

describe('Design System & Theme Tokens', () => {
  it('should have primary color #00B386 for default Green theme', () => {
    expect(greenTheme.primary).toBe('#00B386');
    expect(greenTheme.background).toBeDefined();
    expect(greenTheme.textPrimary).toBeDefined();
    expect(greenTheme.gain).toBe('#00B386');
    expect(greenTheme.loss).toBe('#EB5757');
  });

  it('should have proper dark theme tokens', () => {
    expect(darkTheme.background).toBe('#0B0E14');
    expect(darkTheme.textPrimary).toBe('#FFFFFF');
    expect(darkTheme.statusBarStyle).toBe('light-content');
  });

  it('should have proper blue theme tokens', () => {
    expect(blueTheme.primary).toBe('#1E40AF');
    expect(blueTheme.statusBarStyle).toBe('dark-content');
  });

  it('should define consistent typography scales', () => {
    expect(typography.display.fontSize).toBe(32);
    expect(typography.h1.fontSize).toBe(24);
    expect(typography.h2.fontSize).toBe(20);
    expect(typography.body.fontSize).toBe(14);
    expect(typography.caption.fontSize).toBe(12);
  });

  it('should have 4px/8px based spacing grid', () => {
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(12);
    expect(spacing.lg).toBe(16);
    expect(spacing.xl).toBe(20);
    expect(spacing.xxl).toBe(24);
  });
});
