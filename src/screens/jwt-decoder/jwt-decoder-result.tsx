import { createStyles } from "antd-style";

import { type DecodedJwt, getClaimsInfo, isTokenExpired } from "./jwt-decoder.utils";
import { JwtDecoderAlgorithmCard } from "./jwt-decoder-algorithm-card";
import { JwtDecoderClaimsCard } from "./jwt-decoder-claims-card";
import { JwtDecoderError } from "./jwt-decoder-error";
import { JwtDecoderPlaceholder } from "./jwt-decoder-placeholder";
import { JwtDecoderSections } from "./sections/jwt-decoder-sections";

interface JwtDecoderResultProps {
  decoded: DecodedJwt;
  hasToken: boolean;
}

export const JwtDecoderResult = ({ decoded, hasToken }: JwtDecoderResultProps) => {
  const { styles } = useStyles();

  if (!hasToken) {
    return <JwtDecoderPlaceholder />;
  }

  if (!decoded.isValid) {
    return <JwtDecoderError error={decoded.error} />;
  }

  const expired = isTokenExpired(decoded.payload);
  const claims = getClaimsInfo(decoded.payload);

  return (
    <div className={styles.resultSection}>
      <JwtDecoderAlgorithmCard header={decoded.header} />
      <JwtDecoderClaimsCard claims={claims} />
      <JwtDecoderSections
        header={decoded.header}
        payload={decoded.payload}
        signature={decoded.signature}
        expired={expired}
      />
    </div>
  );
};

const useStyles = createStyles(() => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));
