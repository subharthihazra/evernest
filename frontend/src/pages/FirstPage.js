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
    <div className="product-showcase px-3 sm:px-8 md:px-6 lg:px-2">
      <div className="grid grid-cols-8 md:grid-cols-12 grid-rows-[repeat(23,minmax(0,1fr))] md:grid-rows-[repeat(16,minmax(0,1fr))] w-full gap-3 sm:gap-5 md:aspect-[1/1.5] aspect-[1/3]">
        <ProductShowcaseItem
          className="md:col-start-9 md:col-end-13 md:row-start-2 md:row-end-6 col-start-1 col-end-5 row-start-2 row-end-7"
          src="./assets/images/dispimg_5.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-5 col-start-5 col-end-9 row-start-1 row-end-5"
          src="./assets/images/dispimg_6.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-1 md:col-end-5 md:row-start-2 md:row-end-[10] col-start-5 col-end-9 row-start-5 row-end-[12]"
          src="./assets/images/dispimg_4.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-5 md:col-end-9 md:row-start-5 md:row-end-[9] col-start-1 col-end-5 row-start-7 row-end-[12]"
          src="./assets/images/dispimg_10.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-9 md:col-end-12 md:row-start-6 md:row-end-[9] col-start-2 col-end-5 row-start-[16] row-end-[19]"
          src="./assets/images/dispimg_2.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-5 md:col-end-13 md:row-start-[9] md:row-end-[13] col-start-1 col-end-9 row-start-[12] row-end-[16]"
          src="./assets/images/dispimg_1.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-2 md:col-end-5 md:row-start-[10] md:row-end-[13] col-start-5 col-end-8 row-start-[20] row-end-[23]"
          src="./assets/images/dispimg_3.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-3 md:col-end-7 md:row-start-[13] md:row-end-[17] col-start-1 col-end-5 row-start-[19] row-end-[23]"
          src="./assets/images/dispimg_8.jpeg"
        />
        <ProductShowcaseItem
          className="md:col-start-7 md:col-end-11 md:row-start-[13] md:row-end-[17]  col-start-5 col-end-9 row-start-[16] row-end-[20]"
          src="./assets/images/dispimg_7.jpeg"
        />
      </div>
    </div>
  );
}

function ProductShowcaseItem({ className, src }) {
  return (
    <div
      className={`bg-zinc-200 ${className} rounded-2xl sm:rounded-3xl overflow-hidden`}
    >
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
