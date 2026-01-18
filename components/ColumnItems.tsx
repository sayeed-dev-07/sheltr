import FooterImg from "./FooterImg";

interface ImgProps {
    img1: string
    img2: string
    img3: string
    img4: string
}
const ColumnItems = ({ img1, img2, img3, img4 }: ImgProps) => {
    return (
        <>
            <div className="h-[40vh] md:h-[80vh] w-full">
                <FooterImg alt="footerImg" link={img1} />
            </div>
            <div className="h-[40vh] md:h-[80vh] w-full">
                <FooterImg alt="footerImg" link={img2} />
            </div>
            <div className="h-[40vh] md:h-[80vh] w-full">
                <FooterImg alt="footerImg" link={img3} />
            </div>
            <div className="h-[40vh] md:h-[80vh] w-full">
                <FooterImg alt="footerImg" link={img4} />
            </div>
        </>
    );
};
export default ColumnItems;