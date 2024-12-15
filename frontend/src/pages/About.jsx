import React from 'react';
import aboutImg from '../assets/about_image-MG9zrc7b.png';

const About = () => {
  return (
    <article className="flex flex-col gap-4 justify-center items-center py-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl text-center mb-2">About us</h2>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center w-full max-w-5xl">
        {/* IMAGE */}
        <div className="flex-[0.4] w-full md:w-auto min-w-[200px] md:min-w-[250px] overflow-hidden">
          <img
            src={aboutImg}
            alt="IMAGE"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="flex-[0.6] py-2">
          <p className="text-xs sm:text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            enim soluta ipsa quia eum alias laboriosam voluptatum quos dolore,
            cupiditate unde distinctio reprehenderit modi, cum necessitatibus
            fugiat commodi dolor quidem, obcaecati non sit velit! Numquam saepe
            facilis amet consequatur cum quos dolores iste totam illum
            voluptatum odit quis, laborum expedita iusto placeat error quas
            maiores inventore corporis perspiciatis ut. Error, libero debitis
            veritatis voluptas aperiam nulla saepe nemo recusandae natus veniam
            a facere exercitationem quae eveniet inventore totam ab fugit cum
            temporibus! Ratione et, aliquam exercitationem consectetur harum
            corrupti assumenda libero commodi necessitatibus, optio quae?
            Ducimus soluta, est consequuntur temporibus nulla debitis pariatur
            ab voluptatem aliquam dolore dolor mollitia doloremque maxime ad
            illum molestiae possimus eius expedita consectetur odio aliquid
            numquam repellendus facilis magnam. Provident placeat quis enim
            dignissimos odit. Ad aperiam ipsam corporis similique magnam
            reprehenderit suscipit, cupiditate quod dolorem aut repellat aliquam
            facilis nihil harum veniam rerum laborum!
          </p>
        </div>
      </div>
    </article>
  );
};

export default About;
