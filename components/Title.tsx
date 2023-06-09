import { View, Image, Text } from "react-native";
import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";
import { FC } from "react";

interface TitleProps {
    title: string;
    subTitle: string;
    titleSize: number;
    subTitleSize: number;
}


const Title: FC<TitleProps> = ({ title, subTitle, titleSize, subTitleSize }) => {
    return (
        <View>
            <Text
                style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: titleSize,
                    color: COLORS.primary,
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: subTitleSize,
                    color: COLORS.primary,
                }}
            >
                by {subTitle}
            </Text>
        </View>
    );
};

export default Title