import mainBg from '../../assets/main_background.webp'

export default function CorporateCulture() {
  return (
    <section
      id="corporate-culture"
      className="hidden lg:flex relative isolate min-h-[520px] overflow-hidden justify-center items-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed max-md:bg-scroll"
        style={{ backgroundImage: `url(${mainBg})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto text-left w-full">
        <h2 className="text-center text-[48px] text-white">企业文化</h2>
        <div
          className="mx-auto mt-4 h-[6px] w-[128px] bg-[#FF350D]"
          aria-hidden
        />
        <div className="w-[80%] mx-auto">
          <p className="text-[24px] leading-[45px] text-white indent-[2em]">
            作为中国专业的企业文化咨询公司，我们在生存和发展的历程中，也形成了自己经营管理个性和文化，我们的运营和发展都基于对这些文化涵盖的信念、信条和原则持之以恒、不折不扣地执行，所有公司的成员的所有行为均需与这些标准和原则保持高度统一。 
          </p>
          <p className="text-[24px] leading-[45px] text-white indent-[2em]">
            我们相信，企业的战略可以改变，领导可以更换，甚至文化的表现也要与时俱进，总之一切都可以调整，唯一能保持并引领我们的，只有我们的文化核心。只有信念的坚持才能带来企业的持续增长，只有统一的意志才能锻炼出优秀的队伍，总之只有文化才能使我们长青。
          </p>
        </div>
      </div>
    </section>
  )
}
