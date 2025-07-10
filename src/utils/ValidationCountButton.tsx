export default function ValidationCountButton({ num = 0 }: { num?: number }) {
    const formattedNum = num.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const result = formattedNum.replace(',', '') + 'k';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'k';
  } else { 
    return result;
  }

}
