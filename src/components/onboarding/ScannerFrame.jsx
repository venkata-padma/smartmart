import './ScannerFrame.css';

export default function ScannerFrame({ found = false }) {
  return (
    <div className={`scanner-frame ${found ? 'is-found' : ''}`}>
      <span className="scanner-frame__corner scanner-frame__corner--tl" />
      <span className="scanner-frame__corner scanner-frame__corner--tr" />
      <span className="scanner-frame__corner scanner-frame__corner--bl" />
      <span className="scanner-frame__corner scanner-frame__corner--br" />
      <div className="scanner-frame__scanline" />
      <img className="scanner-frame__watermark" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=75" alt="Camera preview of fresh groceries" />
    </div>
  );
}
