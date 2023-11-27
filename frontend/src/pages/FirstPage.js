function FirstPage() {
  return (
    <>
      <div className="mx-auto lg:w-2/3">
        <div className="hero-section">
          <div></div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <ProductShowcase />
      </div>
      <Garbage />
    </>
  );
}

function ProductShowcase() {
  return (
    <div className="product-showcase px-3 lg:px-2">
      <div className="grid grid-cols-12 grid-rows-[repeat(18,minmax(0,1fr))] w-full gap-5 aspect-[1/1.5]">
        <ProductShowcaseItem
          className="col-start-9 col-end-13 row-start-2 row-end-6"
          src="./assets/images/dispimg_5.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-5 col-end-9 row-start-1 row-end-5"
          src="./assets/images/dispimg_6.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-1 col-end-5 row-start-2 row-end-[10]"
          src="./assets/images/dispimg_4.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-5 col-end-9 row-start-5 row-end-[9]"
          src="./assets/images/dispimg_10.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-9 col-end-12 row-start-6 row-end-[9]"
          src="./assets/images/dispimg_2.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-5 col-end-13 row-start-[9] row-end-[13]"
          src="./assets/images/dispimg_1.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-2 col-end-5 row-start-[10] row-end-[13]"
          src="./assets/images/dispimg_3.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-3 col-end-7 row-start-[13] row-end-[17]"
          src="./assets/images/dispimg_8.jpeg"
        />
        <ProductShowcaseItem
          className="col-start-7 col-end-11 row-start-[13] row-end-[17]"
          src="./assets/images/dispimg_7.jpeg"
        />
      </div>
    </div>
  );
}

function ProductShowcaseItem({ className, src }) {
  return (
    <div className={`bg-zinc-200 ${className} rounded-3xl overflow-hidden`}>
      <img src={src} className="object-cover h-full w-full" />
    </div>
  );
}

function Garbage() {
  return (
    <div className="text-xl leading-8 tracking-wide text-slate-800 dark:text-white opacity-0">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est
      quisquam dolor libero, accusamus tempora ipsum sunt doloribus a
      repellendus nobis excepturi perferendis animi harum, hic repellat?
      Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Expedita est quisquam dolor libero, accusamus tempora ipsum sunt
      doloribus a repellendus nobis excepturi perferendis animi harum, hic
      repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Expedita est quisquam dolor libero, accusamus tempora
      ipsum sunt doloribus a repellendus nobis excepturi perferendis animi
      harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Expedita est quisquam dolor libero,
      accusamus tempora ipsum sunt doloribus a repellendus nobis excepturi
      perferendis animi harum, hic repellat? Eveniet, nostrum velit. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Expedita est quisquam dolor
      libero, accusamus tempora ipsum sunt doloribus a repellendus nobis
      excepturi perferendis animi harum, hic repellat? Eveniet, nostrum velit.
    </div>
  );
}

export default FirstPage;
