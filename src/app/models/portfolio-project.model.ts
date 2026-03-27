export interface PortfolioProject {
  id: string;
  title: string;
  primaryTag: string;
  description: string;
  modalDescription: string;
  stack: string[];
  /** API i usługi zewnętrzne (opcjonalnie osobna sekcja w modalu) */
  apis?: string[];
  demoUrl: string;
  previewImage?: string;
  isPrivate?: boolean;
}
