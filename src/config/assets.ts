// Add only paths to authentic, supplied files that exist in public/.
// Empty arrays/null intentionally keep the clearly labelled placeholders visible.
export const assets: {
  logo: { src: string; width: number; height: number } | null;
  artistPortrait: string | null;
  artworks: Record<string, string[]>;
} = {
  logo: {
    src: "/branding/dilshad-art-studio-logo.jpg",
    width: 740,
    height: 758,
  },
  artistPortrait: null,
  artworks: {
    ART001: ["/artworks/colourful-tulips.jpg"], // source: 1000123048.jpg; visual match for client review
    ART002: ["/artworks/sunlit-ocean.jpg"], // source: 1000123039.jpg; visual match for client review
    ART003: ["/artworks/sunset-flower-meadow.jpg"], // source: 1000123014.jpg; visual match for client review
    ART004: ["/artworks/tropical-beach.jpg"], // source: 1000123029.jpg; visual match for client review
    ART005: ["/artworks/forest-waterfall.jpg"], // source: 1000123058.jpg; visual match for client review
  },
};
