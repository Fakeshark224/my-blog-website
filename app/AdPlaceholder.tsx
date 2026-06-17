export default function AdPlaceholder({ type }: { type: 'square' | 'skyscraper' }) {
  const dimensions = type === 'square' ? 'w-[300px] h-[250px]' : 'w-[300px] h-[600px]';
  
  return (
    <div className={`bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm mx-auto mb-6 ${dimensions}`}>
      {/* PASTE YOUR AD NETWORK SCRIPT HERE */}
      <span>Ad Space ({type})</span>
    </div>
  );
}