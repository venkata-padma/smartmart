import './OrderSummary.css';

export default function OrderSummary({
  title = 'Order Summary',
  subtotal,
  tax,
  deliveryFee,
  total,
  subtotalLabel = 'Subtotal',
  taxRateLabel = 'Tax (8%)',
  showTotal = true,
}) {
  return (
    <div className="order-summary">
      {title && <h3 className="order-summary__title">{title}</h3>}
      <div className="order-summary__row">
        <span>{subtotalLabel}</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>{taxRateLabel}</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="order-summary__row">
        <span>Delivery Fee</span>
        <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span>
      </div>
      {showTotal && (
        <>
          <div className="order-summary__divider" />
          <div className="order-summary__row order-summary__row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
