// Generate consistent avatar URLs for professionals without photos
export function getAvatarUrl(name: string, img?: string): string {
  // If an absolute remote URL is provided, use it. Ignore relative/local paths to avoid broken
  // images when local assets are removed; fall back to generated avatar instead.
  if (img && /^https?:\/\//i.test(img)) return img;
  
  // Infer a likely gender from the given name (best-effort heuristic). This lets us
  // generate avatars that look coherent for male/female profiles without needing a
  // dedicated gender field in the data. Heuristics used (in order):
  //  - explicit match against small common-name lists
  //  - fallback heuristic: names ending in 'a' treated as female (common in Spanish)
  //  - default to 'neutral' when unsure
  const inferGender = (fullName: string) => {
    const female = new Set([
      "maría",
      "maría",
      "maria",
      "ana",
      "laura",
      "sofía",
      "sofia",
      "valentina",
      "carolina",
      "lucía",
      "lucia",
      "camila",
      "gabriela",
      "natalia",
      "jimena",
      "vanesa",
      "alejandra",
      "fernanda",
      "patricia",
      "silvana",
    ]);
    const male = new Set([
      "carlos",
      "javier",
      "diego",
      "roberto",
      "federico",
      "andrés",
      "andres",
      "lucas",
      "miguel",
      "ricardo",
      "raul",
      "hernán",
      "hernan",
      "maximiliano",
      "gonzalo",
      "pablo",
      "juan",
      "sebastián",
      "sebastian",
      "martín",
      "martin",
    ]);

    const first = (fullName || "").split(" ")[0].toLowerCase();
    if (female.has(first)) return "female";
    if (male.has(first)) return "male";
    if (first.endsWith("a")) return "female";
    // If unknown, return neutral so seed still differs from bare name
    return "neutral";
  };

  const gender = inferGender(name);

  // Use DiceBear Avatars API with avataaars style (human-like). We include the
  // inferred gender in the seed so the generated avatar is coherent with gender
  // while remaining deterministic per-name. This keeps avatars "normal" and
  // human-like like on the landing page.
  const seed = encodeURIComponent(`${name}::${gender}`);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}
