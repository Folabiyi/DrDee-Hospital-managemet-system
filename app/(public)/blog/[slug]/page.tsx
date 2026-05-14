import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  return (
    <article className="section">
      <div className="container max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">{post.category} · {post.date}</p>
        <h1 className="mt-3 text-5xl font-bold text-care-ink">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">By {post.author}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg"><Image src={post.image} alt="" fill className="object-cover" /></div>
        <div className="prose prose-lg mt-8 max-w-none"><p>{post.excerpt}</p><p>CareBridge articles are reviewed by clinicians and written to help patients prepare for appointments, understand prevention, and make confident care decisions.</p></div>
      </div>
    </article>
  );
}
