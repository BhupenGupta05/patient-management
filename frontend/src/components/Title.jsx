import React from 'react';

const Title = ({ title, heading, subheading, className="", titleClassName="", headingClassName="", subheadingClassName="" }) => {
  return (
    <header className={`${className} max-w-2xl`}>

      {title && <h2 className={`${titleClassName} `}>{title}</h2>}

      {heading && <h4 className={`${headingClassName} `}>{heading}</h4>}

      {subheading && <p className={`${subheadingClassName} `}>{subheading}</p>}
    </header>
  );
};

export default Title;
