import Link from 'next/link'
import React from 'react'

interface Props {
    text: React.ReactNode;
}

export function slugify(text: string): string {
  const persianMap: Record<string, string> = {
    آ: "a", ا: "a", ب: "b", پ: "p", ت: "t",
    ث: "s", ج: "j", چ: "ch", ح: "h", خ: "kh",
    د: "d", ذ: "z", ر: "r", ز: "z", ژ: "zh",
    س: "s", ش: "sh", ص: "s", ض: "z", ط: "t",
    ظ: "z", ع: "a", غ: "gh", ف: "f", ق: "gh",
    ک: "k", گ: "g", ل: "l", م: "m", ن: "n",
    و: "v", ه: "h", ی: "y",

    "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
    "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
  };

  return text
    .split("")
    .map((char) => persianMap[char] || char)
    .join("")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

const HashScroll = ({ text }: Props) => {
  return (
    <Link href={`#${slugify(String(text))}`}>
        {text}
    </Link>
  )
}

export default HashScroll