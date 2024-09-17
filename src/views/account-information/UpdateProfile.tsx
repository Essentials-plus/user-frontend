import Image from "next/image";
import { UseControllerProps, useController } from "react-hook-form";

type Props = UseControllerProps<any>;

function UpdateProfile(props: Props) {
  const { field, fieldState } = useController(props);

  const imgSrc = field.value
    ? typeof field.value === "object"
      ? URL.createObjectURL(field.value)
      : field.value
    : "https://modernize-angular-main.netlify.app/assets/images/profile/user-1.jpg";

  return (
    <div className="flex items-center gap-[30px]">
      <label className="text-app-dark-green cursor-pointer underline">
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
      <div className=" rounded-full overflow-hidden border border-black max-w-[80px]">
        <Image
          src={imgSrc}
          alt="avatar"
          className="h-[80px] w-[80px] object-cover"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}

export default UpdateProfile;
