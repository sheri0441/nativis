import Image from "next/image";
import Link from "next/link";
import style from "./RichTextRenderer.module.css";
import DetailsSummary from "./DetailsSummary";

const RichTextRenderer = ({ content }: { content: any }) => {
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case "h2":
        return <h2 key={index}>{item.text}</h2>;

      case "h3":
        return <h3 key={index}>{item.text}</h3>;
      case "list":
        return (
          <ul>
            {item.text.map((a: string, index: number) => (
              <li key={index}>{a}</li>
            ))}
          </ul>
        );
      case "paragraph":
        return <p key={index}>{renderParagraphContent(item.text)}</p>;
      case "image":
        return (
          <Image
            key={index}
            src={item.src}
            alt={item.alt}
            width={500}
            height={300}
            layout="responsive"
          />
        );
      case "quote":
        return <blockquote key={index}>{item.text}</blockquote>;
      case "faq":
        return <DetailsSummary answer={item.answer} question={item.question} />;
      default:
        return null;
    }
  };

  const renderParagraphContent = (text: any) => {
    if (typeof text === "string") {
      return text;
    }
    return text.map((item: any, index: number) => {
      if (typeof item === "string") {
        return item;
      }
      switch (item.type) {
        case "quote":
          return <q key={index}>{item.text}</q>;
        case "link":
          return (
            <Link key={index} href={item.href}>
              {item.text}
            </Link>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className={`${style.postContentStyling} px-6 lg:px-0`}>
      {content.map((item: any, index: number) => renderContent(item, index))}
    </div>
  );
};

export default RichTextRenderer;
