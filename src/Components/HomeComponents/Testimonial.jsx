import TitleAndSubheading from "../../Shared/TitleAndSubheading";

const TestimonialCard = ({ image, name, role, content }) => (
	<div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
	  <img src={image} alt={name} className="w-20 h-20 rounded-full mb-4" />
	  <p className="text-gray-700 text-center mb-4">{content}</p>
	  <p className="font-bold text-blue-600">{name}</p>
	  <p className="text-sm text-gray-600">{role}</p>
	</div>
  );
  
  const Testimonial = () => {
	const testimonials = [
	  {
		image: "https://i.ibb.co/ScLz5b5/pic1.jpg",
		name: "Avinash Kr",
		role: "Co-Founder at xyz",
		content: "Like this vide and ask your questions in comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop."
	  },
	  {
		image: "https://i.ibb.co/cT2y4cB/pic2.jpg",
		name: "Bharat Kunal",
		role: "Manager at xyz",
		content: "Like this vide and ask your questions in comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop."
	  },
	  {
		image: "https://i.ibb.co/8gbSZKg/pic3.jpg",
		name: "Prabhakar D",
		role: "Founder / CEO at xyz",
		content: "Like this vide and ask your questions in comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop."
	  }
	];
  
	return (
	  <div className="container mx-auto px-4 py-8">
		<TitleAndSubheading title="TESTIMONIALS"></TitleAndSubheading>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {testimonials.map((testimonial, index) => (
			<TestimonialCard key={index} {...testimonial} />
		  ))}
		</div>
	  </div>
	);
  };
  
  export default Testimonial;