import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import Button from '../../components/common/Button';
import OnboardingSlide from '../../components/onboarding/OnboardingSlide';
import smartScanningImg from '../../assets/icons/smart-scanning.png';
import easyShoppingImg from '../../assets/icons/easy-shopping.png';
import quickPaymentImg from '../../assets/icons/quick-payment.png';
import './Onboarding.css';

const slides = [
  {
    illustration: <img src={smartScanningImg} alt="AI-powered product scanner" />,
    title: 'Smart Scanning',
    subtitle: 'Scan products instantly with AI-powered recognition',
  },
  {
    illustration: <img src={easyShoppingImg} alt="Shopping cart" />,
    title: 'Easy Shopping',
    subtitle: 'Add items to cart and checkout seamlessly',
  },
  {
    illustration: <img src={quickPaymentImg} alt="Secure card payment" />,
    title: 'Quick Payment',
    subtitle: 'Pay securely with multiple payment options',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/login', { state: { anim: 'fade' } });
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <main className="page page--no-nav onboarding">
      <div className="onboarding__top">
        <button className="onboarding__skip" onClick={() => navigate('/login', { state: { anim: 'fade' } })}>
          Skip
        </button>
      </div>

      <div key={step} className="page-anim page-anim--push-left">
        <OnboardingSlide {...slides[step]} />
      </div>

      <div className="onboarding__dots">
        {slides.map((_, i) => (
          <span key={i} className={`onboarding__dot ${i === step ? 'is-active' : ''}`} />
        ))}
      </div>

      <Button variant="primary" onClick={handleNext} icon={<Icon name={isLast ? 'checkCircle' : 'chevronRight'} size={18} />}>
        {isLast ? 'Get Started' : 'Next'}
      </Button>
    </main>
  );
}
