import Image from "next/image";
import { UseControllerProps, useController } from "react-hook-form";

type Props = UseControllerProps<any>;

function UpdateProfile(props: Props) {
  const { field } = useController(props);

  const imgSrc = field.value
    ? typeof field.value === "object"
      ? URL.createObjectURL(field.value)
      : field.value
    : "https://modernize-angular-main.netlify.app/assets/images/profile/user-1.jpg";

  return (
    <div className="flex items-center gap-[30px]">
      <label className="cursor-pointer text-app-dark-green underline">
        profiel uploaden
        <input
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              field.onChange(file);
            }
          }}
        />
      </label>
      <div className=" max-w-[80px] overflow-hidden rounded-full border border-black">
        <Image
          src={imgSrc}
          alt="avatar"
          className="size-[80px] object-cover"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}

export default UpdateProfile;
