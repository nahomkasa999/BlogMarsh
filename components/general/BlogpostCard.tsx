import Image from "next/image";
import Link from "next/link";

interface IAppProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function BlogPostCard({ data }: IAppProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/blog/${data.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            className="object-cover w-full h-48 rounded-t-lg transition-transform duration-300 group-hover:scale-110"
            fill
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/blog/${data.id}`} className="block">
          <h2 className="text-xl font-bold group-hover:text-blue-500">
            {data.title}
          </h2>
        </Link>
        <p className="text-gray-500 mt-2 line-clamp-3">{data.content}</p>
        <div className=" flex items-center justify-between h-auto mt-4 mr-4 overflow-hidden">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                className="rounded-full object-cover transition-transfrom duration-300 group-hover:border-blue-700 "
                width={30}
                height={30}
              />
            </div>
            <p className="text-gray-400 ">{data.authorName}</p>
          </div>
          <p className="text-gray-400">
            {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                }).format(new Date(data.createdAt))

            }
          </p>
        </div>
      </div>
    </div>
  );
}
