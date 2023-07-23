import type { z } from 'astro/zod'
import type { MDXInstance } from 'astro';
import type { AnyZodObject } from 'astro/zod';

export function validateFrontmatters<T extends AnyZodObject>(files: MDXInstance<Record<string, any>>[], fmSchema: T) {
  return files.map((file) => {
    const copy = Object.assign({}, file, {
      frontmatter: fmSchema.parse(file.frontmatter)
    });

    return copy as MDXInstance<z.infer<typeof fmSchema>>;
  })
}

export function fileToSlug(fileName: string) {
  return (fileName.split('/').at(-1) || '').replace('.mdx', '');
}
