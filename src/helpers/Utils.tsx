export const calculateLuminance = (color: string) => {
    const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = color.match(regex);

    if (match) {
        const s = parseFloat(match[2]) / 100;
        const l = parseFloat(match[3]) / 100;

        const luminance = (l + 0.05) / (1.05 - s * (l > 0.5 ? 1 - l : l));
        return luminance * 21.3 + 4.6;
    }
    return 0;
};

export const generatePastelDarkColor = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const saturation = 30 + Math.random() * 20;
    const lightness = 40 + Math.random() * 20;

    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
};

export const getTextColor = (backgroundColor: string) => {
    const luminance = calculateLuminance(backgroundColor);
    return luminance < 128 ? 'white' : 'black';
};

export const generateSubtleBackground = (bgColor: string) => {
    const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = bgColor.match(regex);

    if (match) {
        const hue = match[1];
        const saturation = match[2];
        let lightness = parseFloat(match[3]);

        lightness = Math.max(lightness - 10, 30);

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    return bgColor;
};