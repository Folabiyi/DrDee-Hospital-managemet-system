import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/lib/data";

export const metadata = { title: "Health Blog" };

export default function BlogPage() {
  return (
    <section className="section bg-muted/45">
      <div className="container">
        <h1 className="text-4xl font-bold text-care-ink">Health blog and news</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="overflow-hidden rounded-lg border bg-white">
              <div className="relative aspect-[16/10]"><Image src={post.image} alt="" fill className="object-cover" /></div>
              <div className="p-5"><Badge>{post.category}</Badge><h2 className="mt-3 text-xl font-bold">{post.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
