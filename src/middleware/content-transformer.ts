export type ContentTransformInput = {
  rawContent: string;
  title?: string;
  metadata?: Record<string, unknown>;
};

export type ContentTransformResult = {
  rawContent: string;
  normalizedContent: string;
  title: string;
  metadata: Record<string, unknown>;
  summary: string;
  wordCount: number;
  characterCount: number;
};

const normalizeWhitespace = (value: string): string =>
  value.replace(/\s+/g, ' ').trim();

export function transformContent(input: ContentTransformInput): ContentTransformResult {
  const rawContent = input.rawContent ?? '';
  const normalizedContent = normalizeWhitespace(rawContent);
  const title = input.title?.trim() || 'Untitled Lesson';
  const metadata = {
    ...(input.metadata ?? {}),
    source: 'content-transformer',
    transformedAt: new Date().toISOString(),
  };

  const summary = normalizedContent.length > 180
    ? `${normalizedContent.slice(0, 177).trim()}...`
    : normalizedContent;

  return {
    rawContent,
    normalizedContent,
    title,
    metadata,
    summary,
    wordCount: normalizedContent ? normalizedContent.split(/\s+/).length : 0,
    characterCount: normalizedContent.length,
  };
}
