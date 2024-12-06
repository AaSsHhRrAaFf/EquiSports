
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';

const FeaturedAthletes = () => {
  const athletes = [
    {
      id: 1,
      name: "Sarah Johnson",
      sport: "Cricket",
      testimonial: "The quality of equipment from Sports Hub has significantly improved my game performance.",
      image: "/images/athlete1.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      sport: "Basketball",
      testimonial: "Best sports store for professional gear. Their customer service is exceptional.",
      image: "/images/athlete2.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "David Smith",
      sport: "Football",
      testimonial: "I've been shopping here for years. The equipment quality is consistently excellent.",
      image: "/images/athlete3.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Fade>
          <h2 className="text-3xl font-bold text-center mb-8">Athletes Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {athletes.map((athlete) => (
              <div 
                key={athlete.id} 
                className="card bg-base-100 shadow-xl"
                data-tooltip-id={`athlete-${athlete.id}`}
              >
                <figure className="px-4 pt-4">
                  <img 
                    src={athlete.image} 
                    alt={athlete.name} 
                    className="rounded-xl h-48 w-48 object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{athlete.name}</h3>
                  <p className="text-primary font-semibold">{athlete.sport}</p>
                  <p className="text-sm italic">{athlete.testimonial}</p>
                  <div className="rating rating-sm">
                    {[...Array(athlete.rating)].map((_, i) => (
                      <input 
                        key={i} 
                        type="radio" 
                        className="mask mask-star-2 bg-orange-400" 
                        disabled 
                      />
                    ))}
                  </div>
                </div>
                <Tooltip 
                  id={`athlete-${athlete.id}`} 
                  content={`Professional ${athlete.sport} Player`} 
                />
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default FeaturedAthletes;
