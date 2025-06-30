import Image from "next/image"

export default function LogoIcon({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/reels-video.png"
      alt="ReelsTok Logo"
      width={size}
      height={size}
      priority
      style={{ display: "inline-block" }}
    />
  )
}