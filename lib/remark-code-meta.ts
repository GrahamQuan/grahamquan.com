type MarkdownNode = {
  type?: string;
  meta?: string | null;
  data?: {
    hProperties?: Record<string, string | number | boolean>;
  };
  children?: MarkdownNode[];
};

function readQuotedMeta(meta: string, name: string) {
  const match = meta.match(new RegExp(`(?:^|\\s)${name}=(?:"([^"]+)"|'([^']+)')`));
  return match?.[1] ?? match?.[2];
}

/**
 * Preserve the useful part of fenced-code metadata as HTML properties so the
 * MDX component can support Fumadocs-style `title` and `lineNumbers` options.
 */
export default function remarkCodeMeta() {
  return (tree: MarkdownNode) => {
    function visit(node: MarkdownNode) {
      if (node.type === 'code' && node.meta) {
        const title = readQuotedMeta(node.meta, 'title');
        const lineNumberMatch = node.meta.match(/(?:^|\s)lineNumbers(?:=(\d+))?(?=\s|$)/);
        const existingProperties = node.data?.hProperties ?? {};

        node.data ??= {};
        node.data.hProperties = {
          ...existingProperties,
          ...(title ? { title } : {}),
          ...(lineNumberMatch
            ? {
                'data-line-numbers': true,
                ...(lineNumberMatch[1] ? { 'data-line-numbers-start': Number(lineNumberMatch[1]) } : {}),
              }
            : {}),
        };
      }

      node.children?.forEach(visit);
    }

    visit(tree);
  };
}
