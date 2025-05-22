export interface ProjectCardInterface {
  id?: any;
  project: {
    image: string;
    category: string;
    name: string;
    description: string;
    link: string;
    github: string;
    language?: "javascript" | "typescript" | "python" | "shopify";
    tags?: string[];
  };
  /**
   * Controls special styling for the card:
   * - When true: Uses transparent background with backdrop blur (for Projects page)
   * - When false/undefined: Uses solid background (for Home page)
   * - Also affects description height and other styling aspects
   */
  specialStyle?: boolean;
}
