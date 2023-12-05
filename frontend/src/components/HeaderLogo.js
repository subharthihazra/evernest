import React from "react";

function HeaderLogo({
  children,
  href = null,
  target = null,
  linkProps = "",
  className: boxPropsClassName = "",
  ...otherBoxProps
}) {
  const { className: linkPropsClassName = "", ...otherLinkProps } = linkProps;

  let childrenWithProps;
  if (!Array.isArray(children)) {
    const { className: logoPropsClassName = "", ...otherLogoProps } =
      children?.props;

    childrenWithProps = React.cloneElement(children, {
      className: `text-black dark:text-white h-8 w-8 ${logoPropsClassName}`,
      ...otherLogoProps,
    });
  }

  return (
    <a
      href={href}
      className={`${linkPropsClassName}`}
      target={target}
      {...otherLinkProps}
    >
      <div
        className={`h-10 w-10 flex justify-center items-center ${boxPropsClassName}`}
        {...otherBoxProps}
      >
        {Array.isArray(children) ? children : childrenWithProps}
      </div>
    </a>
  );
}

export default HeaderLogo;
