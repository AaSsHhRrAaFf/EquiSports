
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';
import seasonDeal from '../assets/season-deal.webp'
import bundleDeal from '../assets/Bundle-Deal.webp'  
import studentDeal from '../assets/student-deal.webp' 

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Seasonal Sale",
      description: "Up to 40% off on all cricket equipment",
      validUntil: "December 31, 2024",
      image: seasonDeal
    },
    {
      id: 2,
      title: "Bundle Deal",
      description: "Buy any bat and get 20% off on batting pads",
      validUntil: "Limited Time Offer",
      image: bundleDeal
    },
    {
      id: 3,
      title: "Student Discount",
      description: "10% off with valid student ID",
      validUntil: "Ongoing",
      image: studentDeal
    }
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <Fade cascade damping={0.2}>
          <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="card bg-base-100 shadow-xl"
                data-tooltip-id={`offer-${offer.id}`}
              >
                <figure>
                  <img src={offer.image} alt={offer.title} className="h-48 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{offer.title}</h3>
                  <p>{offer.description}</p>
                  <div className="card-actions justify-end">
                    <span className="text-sm text-gray-500">Valid until: {offer.validUntil}</span>
                  </div>
                </div>
                <Tooltip id={`offer-${offer.id}`} content="Click to view details" />
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default SpecialOffers;
