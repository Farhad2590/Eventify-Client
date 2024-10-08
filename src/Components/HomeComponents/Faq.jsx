
import image from '../../assets/HomeImages/faq.png'
import TitleAndSubheading from '../../Shared/TitleAndSubheading';

const Faq = () => {
	return (
		<div>
			<TitleAndSubheading title="Frequently Asked Questions "></TitleAndSubheading>
			<div className=" flex flex-col lg:items-center lg:justify-center lg:gap-10 lg:flex-row">
				<img
					src={image}
					className="rounded-lg " />
				<div>
					<section className="bg-blue-600 text-white">
						<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
							{/* <h2 className="text-2xl font-semibold sm:text-4xl"></h2> */}
							<p className="mt-4 mb-8 text-white">Sagittis tempor donec id vestibulum viverra. Neque condimentum primis orci at lacus amet bibendum.</p>
							<div className="space-y-4">
								<details className="w-full border rounded-lg">
									<summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">Ex orci laoreet egestas sapien magna egestas scelerisque?</summary>
									<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-white">Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est. </p>
								</details>
								<details className="w-full border rounded-lg">
									<summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">Lorem at arcu rutrum viverra metus sapien venenatis lobortis odio?</summary>
									<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-white">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
								</details>
								<details className="w-full border rounded-lg">
									<summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">Eleifend feugiat sollicitudin laoreet adipiscing bibendum suscipit erat?</summary>
									<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-white">Justo libero tellus integer tincidunt justo semper consequat venenatis aliquet imperdiet. Ultricies urna proin fusce nulla pretium sodales vel magna et massa euismod vulputate sed. </p>
								</details>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Faq;