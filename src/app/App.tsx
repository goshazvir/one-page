import { StoreProvider } from '@/app/providers';
import { EditorPage } from '@/pages/EditorPage';

export const App = () => {
  return (
    <StoreProvider>
      <EditorPage />
    </StoreProvider>
  );
};
