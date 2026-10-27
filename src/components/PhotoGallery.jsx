import { useEffect, useRef, useState } from "react";
import $ from "jquery";

const photos = [
    {
        src: "https://media.istockphoto.com/id/2177286378/pl/zdj%C4%99cie/kobieta-w%C4%99druj%C4%85ca-w-kierunku-%C5%9Bwiat%C5%82a-s%C5%82onecznego-we-wspania%C5%82ym-kanionie-buckskin-gulch-usa.jpg?s=1024x1024&w=is&k=20&c=l9pwv5o9JgdvxNJoFMyhRySV4F0PFCEwZgbLRalD-3I=",
        alt: "Droga prowadząca przez pustynny kanion",
        title: "Droga przez kanion",
        category: "Krajobrazy",
    },
    {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85",
        alt: "Jezioro otoczone górami i lasem",
        title: "Spokojny poranek nad jeziorem",
        category: "Jeziora",
    },
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
        alt: "Jezioro u podnóża gór",
        title: "Górskie jezioro",
        category: "Jeziora",
    },
    {
        src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
        alt: "Poranne światło nad zielonymi polami",
        title: "Poranek na łące",
        category: "Krajobrazy",
    },
    {
        src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
        alt: "Droga prowadząca przez malowniczy krajobraz",
        title: "Droga przez naturę",
        category: "Krajobrazy",
    },
    {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
        alt: "Mgła unosząca się nad zieloną doliną",
        title: "Mglisty poranek",
        category: "Krajobrazy",
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",
        alt: "Promienie słońca wpadające do leśnej głuszy",
        title: "Leśna ścieżka",
        category: "Lasy",
    },
    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
        alt: "Ośnieżone szczyty górskie",
        title: "Ośnieżone szczyty",
        category: "Góry",
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=85",
        alt: "Fale rozbijające się o brzeg",
        title: "Morskie fale",
        category: "Morze",
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
        alt: "Tropikalna plaża z turkusową wodą",
        title: "Plaża i turkusowa woda",
        category: "Morze",
    },
    {
        src: "https://images.unsplash.com/photo-1473116763249-2ffaa01cf1aa?auto=format&fit=crop&w=1600&q=85",
        alt: "Złote światło zachodu słońca w lesie",
        title: "Złota godzina w lesie",
        category: "Lasy",
    },
    {
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
        alt: "Góra pod rozgwieżdżonym niebem",
        title: "Góry pod gwiazdami",
        category: "Góry",
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85",
        alt: "Zielony górski krajobraz w świetle słońca",
        title: "Zielone górskie szlaki",
        category: "Góry",
    },
    {
        src: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1600&q=85",
        alt: "Zielone liście w ciepłym świetle",
        title: "Zieleń w słońcu",
        category: "Lasy",
    },
    {
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85",
        alt: "Rozległy krajobraz z górami i niebem",
        title: "Rozległy krajobraz",
        category: "Krajobrazy",
    },
];

const categories = ["Wszystkie", ...new Set(photos.map((photo) => photo.category))];

function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const imageRef = useRef(null);
    const lightboxImageRef = useRef(null);
    const lightboxRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const directionRef = useRef(1);
    const displayedPhotoRef = useRef(`${selectedCategory}:${currentIndex}`);
    const goToImageRef = useRef(null);
    const closeLightboxRef = useRef(null);
    const filteredPhotos = selectedCategory === "Wszystkie"
        ? photos
        : photos.filter((photo) => photo.category === selectedCategory);

    const transitionToImage = (nextIndex, direction) => {
        if (nextIndex === currentIndex || isAnimatingRef.current) return;
        if (nextIndex < 0 || nextIndex >= filteredPhotos.length) return;

        const activeImage = lightboxOpen
            ? lightboxImageRef.current
            : imageRef.current;
        if (!activeImage) return;

        isAnimatingRef.current = true;
        directionRef.current = direction;
        $(activeImage)
            .stop(true, false)
            .animate(
                { opacity: 0, left: direction > 0 ? "-24px" : "24px" },
                160,
                () => setCurrentIndex(nextIndex),
            );
    };

    const goToImage = (direction) => {
        const nextIndex =
            (currentIndex + direction + filteredPhotos.length) % filteredPhotos.length;
        transitionToImage(nextIndex, direction);
    };

    const closeLightbox = () => {
        $(lightboxRef.current).stop(true, true).fadeOut(180, () => {
            setLightboxOpen(false);
        });
    };

    useEffect(() => {
        goToImageRef.current = goToImage;
        closeLightboxRef.current = closeLightbox;
    });

    useEffect(() => {
        const displayedPhoto = `${selectedCategory}:${currentIndex}`;
        if (!lightboxOpen && displayedPhotoRef.current === displayedPhoto) {
            return undefined;
        }

        displayedPhotoRef.current = displayedPhoto;
        const activeImage = lightboxOpen
            ? lightboxImageRef.current
            : imageRef.current;
        if (!activeImage) return undefined;

        const offset = directionRef.current > 0 ? "24px" : "-24px";
        $(activeImage)
            .stop(true, false)
            .css({ opacity: 0, left: offset })
            .animate({ opacity: 1, left: 0 }, 260, () => {
                isAnimatingRef.current = false;
            });

        return () => {
            $(activeImage).stop(true, false);
        };
    }, [currentIndex, lightboxOpen, selectedCategory]);

    useEffect(() => {
        if (!lightboxOpen) return undefined;

        const $lightbox = $(lightboxRef.current);
        $lightbox.stop(true, true).hide().fadeIn(180);

        return () => {
            $lightbox.stop(true, true);
        };
    }, [lightboxOpen]);

    useEffect(() => {
        if (!lightboxOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeLightboxRef.current();
            if (event.key === "ArrowLeft") goToImageRef.current(-1);
            if (event.key === "ArrowRight") goToImageRef.current(1);
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxOpen]);

    const photo = filteredPhotos[currentIndex];

    const filterByCategory = (category) => {
        if (category === selectedCategory) return;
        $(imageRef.current).stop(true, false);
        $(lightboxImageRef.current).stop(true, false);
        isAnimatingRef.current = false;
        directionRef.current = 1;
        setCurrentIndex(0);
        setSelectedCategory(category);
    };

    return (
        <section className="photo-gallery" aria-labelledby="gallery-title">
            <div className="gallery-heading">
                <div>
                    <p className="gallery-eyebrow">CHWILE WARTE ZAPAMIĘTANIA</p>
                    <h2 id="gallery-title">Galeria zdjęć</h2>
                </div>
                <p className="gallery-count">
                    {String(currentIndex + 1).padStart(2, "0")}
                    <span> / {String(filteredPhotos.length).padStart(2, "0")}</span>
                </p>
            </div>

            <div className="gallery-filters" aria-label="Filtruj zdjęcia według kategorii">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`gallery-filter${selectedCategory === category ? " is-active" : ""}`}
                        type="button"
                        aria-pressed={selectedCategory === category}
                        onClick={() => filterByCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="gallery-viewer">
                <img
                    ref={imageRef}
                    className="gallery-main-image"
                    src={photo.src}
                    alt={photo.alt}
                    onClick={() => setLightboxOpen(true)}
                />
                <button
                    className="gallery-nav gallery-nav-previous"
                    type="button"
                    aria-label="Poprzednie zdjęcie"
                    onClick={() => goToImage(-1)}
                >
                    <span aria-hidden="true">←</span>
                </button>
                <button
                    className="gallery-nav gallery-nav-next"
                    type="button"
                    aria-label="Następne zdjęcie"
                    onClick={() => goToImage(1)}
                >
                    <span aria-hidden="true">→</span>
                </button>
                <button
                    className="gallery-zoom"
                    type="button"
                    aria-label="Powiększ zdjęcie"
                    onClick={() => setLightboxOpen(true)}
                >
                    <span aria-hidden="true">⤢</span>
                    Powiększ
                </button>
            </div>

            <div className="gallery-caption">
                <h3>{photo.title}</h3>
                <p>Kliknij zdjęcie, aby zobaczyć je w powiększeniu</p>
            </div>

            <div className="gallery-thumbnails" aria-label="Wybierz zdjęcie">
                {filteredPhotos.map((item, index) => (
                    <button
                        key={item.src}
                        className={`gallery-thumbnail${index === currentIndex ? " is-active" : ""}`}
                        type="button"
                        aria-label={`Pokaż zdjęcie ${index + 1}: ${item.title}`}
                        aria-pressed={index === currentIndex}
                        onClick={() =>
                            transitionToImage(index, index > currentIndex ? 1 : -1)
                        }
                    >
                        <img src={item.src} alt="" loading="lazy" />
                    </button>
                ))}
            </div>

            {lightboxOpen && (
                <div
                    ref={lightboxRef}
                    className="gallery-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Powiększone zdjęcie: ${photo.title}`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) closeLightbox();
                    }}
                >
                    <button
                        className="lightbox-close"
                        type="button"
                        aria-label="Zamknij podgląd"
                        onClick={closeLightbox}
                    >
                        ×
                    </button>
                    <button
                        className="gallery-nav gallery-nav-previous"
                        type="button"
                        aria-label="Poprzednie zdjęcie"
                        onClick={() => goToImage(-1)}
                    >
                        <span aria-hidden="true">←</span>
                    </button>
                    <img
                        ref={lightboxImageRef}
                        className="lightbox-image"
                        src={photo.src}
                        alt={photo.alt}
                    />
                    <button
                        className="gallery-nav gallery-nav-next"
                        type="button"
                        aria-label="Następne zdjęcie"
                        onClick={() => goToImage(1)}
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                    <p className="lightbox-caption">{photo.title}</p>
                </div>
            )}
        </section>
    );
}

export default PhotoGallery;
