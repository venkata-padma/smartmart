import './OnboardingSlide.css';

export default function OnboardingSlide({ illustration, title, subtitle }) {
  return (
    <div className="onboarding-slide">
      <div className="onboarding-slide__illustration">{illustration}</div>
      <h2 className="onboarding-slide__title">{title}</h2>
      <p className="onboarding-slide__subtitle">{subtitle}</p>
    </div>
  );
}
