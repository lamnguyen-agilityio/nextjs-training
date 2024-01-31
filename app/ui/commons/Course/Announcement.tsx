import Image from 'next/image';

interface Props {
  name: string;
  role: string;
  time: string;
  content: string;
  src: string;
}

const Announcement = ({ name, role, time, content, src }: Props) => (
  <div className="flex flex-col gap-5">
    <div className="flex justify-between items-center rounded-md bg-outline-text-main px-5 py-3">
      <div>
        <p className="title-section">Teach the world online</p>
        <p className="content-section">
          Create an online video course, reach students accross the globe, and
          earn money
        </p>
      </div>
      <div className="border text-base text-fill-text-main cursor-not-allowed rounded-md px-3 py-2">
        Become a mentor
      </div>
    </div>
    <div className="bg-background py-3">
      <div className="w-full flex gap-3 items-center border-b px-5 pb-3 mb-3">
        <Image
          src={src}
          alt="angular"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="title-section">{name}</p>
          <p className="content-section">
            {role} | {time}
          </p>
        </div>
      </div>
      <p className="content-section px-5">{content}</p>
    </div>
  </div>
);

export default Announcement;
