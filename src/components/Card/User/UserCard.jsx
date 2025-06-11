
/**
 * UserCard component to display user profile information in a compact card format.
 *
 * @component
 *
 * @example
 * <UserCard
 *   avatar="/avatars/user1.png"
 *   name="Phạm Thành Đạt"
 *   profession="Frontend Developer"
 *   variant="compact"
 *   action={<ButtonApp title="Kết bạn" onClick={() => alert("Sent")} />}
 * />
 *
 * @param {Object} props
 * @param {string} props.avatar - Image URL of the user avatar
 * @param {string} props.name - Display name of the user
 * @param {string} [props.profession] - Job title or profession
 * @param {React.ReactNode} [props.action] - Optional action button or element on the right
 * @param {string} [props.variant="default"] - Layout variant, must match keys in userCardVariants
 *
 * @returns {JSX.Element}
 */
import images from "@/assets/images";
import { memo } from "react";
import { userCardClasses, userCardVariants } from "./UserCard.Config";

function UserCard({
      avatar = images.defaultAvatar,
      name = "",
      profession = "",
      action,
      variant = "default",
}) {
      return (
            <div className={`${userCardClasses.container} ${userCardVariants[variant]}`}>
                  <div className={userCardClasses.left}>
                        <img
                              src={avatar || images.userAvataDefault}
                              alt="avatar"
                              className={userCardClasses.avatar}
                        />
                        <div className="flex flex-col">
                              <span className={userCardClasses.name}>{name}</span>
                              {profession && <span className={userCardClasses.profession}>{profession}</span>}
                        </div>
                  </div>

                  {action && <div>{action}</div>}
            </div>
      );
}

export default memo(UserCard);
