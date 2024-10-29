import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Image from 'next/image'

interface NewsItem {
    id: string;
    date: string;
    title: string;
    content: string;
    image: string;
    category: string;
}

interface BeritaLandingPageProps {
    featuredNews: NewsItem;
    news: NewsItem[];
}

const BeritaLandingPage = ({ featuredNews, news }: BeritaLandingPageProps) => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Berita Terbaru</h1>
            </div>

            {/* Featured News */}
            <Card className="w-full overflow-hidden">
                <div className="relative">
                    <Image 
                        src={featuredNews.image}
                        alt={featuredNews.title} 
                        width={1920}
                        height={1080}
                        priority // Add priority for LCP
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{featuredNews.date}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mt-2">{featuredNews.title}</h2>
                    </div>
                </div>
            </Card>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                            <Image 
                                src={item.image} // Fixed: Use item.image instead of featuredNews.image
                                alt={item.title} // Fixed: Use item.title
                                width={500}
                                height={500}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <CardHeader className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>{item.date}</span>
                            </div>
                            <CardTitle className="text-sm font-bold line-clamp-2">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.content}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" className="px-0 text-blue-600">
                                Baca selengkapnya
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
                <Button variant="outline">
                    Lihat berita lainnya
                </Button>
            </div>
        </div>
    );
};

export default BeritaLandingPage;