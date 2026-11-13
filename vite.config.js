import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import {defineConfig} from 'vite';

// 新项目的做法：整个项目都开 React Compiler（第 19 课）。
// 所以这个项目里一行 useMemo / useCallback 都没有。
export default defineConfig({
  plugins: [react(), babel({presets: [reactCompilerPreset()]})],
});
