import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import ScannerFrame from '../../components/onboarding/ScannerFrame';
import './ScanProduct.css';

export default function ScanProduct() {
  const navigate = useNavigate();
  const [detected, setDetected] = useState(false);
  const [uploadedName, setUploadedName] = useState('');

  const handleScan = () => {
    setDetected(true);
    setTimeout(() => navigate('/scan/result'), 500);
  };

  return (
    <>
      <AppHeader title="Scan Product" right={<Icon name="more" />} />
      <PageContainer>
        <ScannerFrame found={detected} />

        <div className="scan-status">
          <div className={`scan-status__ring ${detected ? 'is-found' : ''}`}>
            <Icon name={detected ? 'check' : 'scan'} size={22} />
          </div>
          <h2 className="scan-status__title">Place Barcode in Frame</h2>
          <p className="scan-status__subtitle">
            Position the barcode within the scanning area to identify the product automatically
          </p>
        </div>

        <div className="scan-actions">
          <label className="scan-actions__upload">
            {uploadedName ? 'Image Ready' : 'Upload Image'}
            <input type="file" accept="image/*" onChange={(event) => setUploadedName(event.target.files?.[0]?.name || '')} />
          </label>
          <button className="scan-actions__trigger" onClick={handleScan} aria-label="Scan now">
            <Icon name="scan" size={22} />
          </button>
        </div>
      </PageContainer>
    </>
  );
}
