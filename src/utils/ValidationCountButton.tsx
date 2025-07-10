export default function ValidationCountButton({ num = 0 }: { num?: number }) {
  let display: string;

  if (num >= 100000) {
    display = (num / 100000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else if (num >= 1000) {
    display = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    display = num.toString();
  }

  return display
}
