interface DevtoPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  url: string;
  cover_image: string;
  positive_reactions_count: number;
  comments_count: number;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
}

interface FormattedDevtoPost {
  title: string;
  cover: string;
  tags: string[];
  date: string;
  reactions: number;
  comments: number;
  url: string;
  excerpt: string;
}

export const fetchDevtoPosts = async (
  username: string
): Promise<FormattedDevtoPost[]> => {
  try {
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    const response = await fetch(
      `/api/devto?username=${username}&_=${timestamp}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store", // Using Next.js fetch cache control
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch DEV.to articles");
    }

    const posts: DevtoPost[] = await response.json();

    return posts.map((post) => {
      const isValidImageUrl =
        post.cover_image &&
        (post.cover_image.startsWith("http") ||
          post.cover_image.startsWith("/"));

      return {
        title: post.title,
        cover: isValidImageUrl
          ? post.cover_image
          : "/projects/devto-default.png",
        tags: post.tag_list || [],
        date: post.published_at,
        reactions: post.positive_reactions_count,
        comments: post.comments_count,
        url: post.url,
        excerpt: post.description || "Confira este artigo no DEV.to!",
      };
    });
  } catch (error) {
    console.error("Error fetching DEV.to articles:", error);
    return [];
  }
};
