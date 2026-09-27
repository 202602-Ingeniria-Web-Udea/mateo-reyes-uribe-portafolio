"use client";
import { Download } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { IconBadge } from "@/components/atoms/IconBadge";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { Tag } from "@/components/atoms/Tag";
import { knowledgeItems } from "@/data/knowledge";
import { experienceItems } from "@/data/experience";
import { extraSkills, profile, programmingSkills, socialLinks } from "@/data/profile";

export default function ProbeAtoms() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-10">
      <SectionHeading title="Átomos" subtitle="Banco de pruebas temporal." />
      <Divider />
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primario md</Button>
        <Button size="sm">Primario sm</Button>
        <Button variant="secondary" icon={Download}>
          Secundario
        </Button>
        <Button variant="secondary" size="sm" icon={Download} iconPosition="right">
          Con icono derecha
        </Button>
        <Button disabled>Deshabilitado</Button>
      </div>
      <Avatar src={profile.avatarUrl} alt={profile.name} size={120} ring priority />
      <div className="space-y-3">
        {programmingSkills.map((skill) => (
          <ProgressBar key={skill.name} level={skill.level} ariaLabel={skill.name} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {knowledgeItems.map((item) => (
          <IconBadge key={item.id} icon={item.icon} />
        ))}
        {extraSkills.map((skill) => (
          <IconBadge key={skill.label} icon={skill.icon} shape="square" tone="neutral" />
        ))}
        <IconBadge icon="Check" tone="success" size={64} />
      </div>
      <div className="flex flex-wrap gap-2">
        {experienceItems
          .filter((item) => item.period)
          .map((item) => (
            <Tag key={item.id} icon="Calendar">
              {item.period}
            </Tag>
          ))}
        <Tag>Sin icono</Tag>
      </div>
      <div className="flex gap-3">
        {socialLinks.map((link) => (
          <SocialIconLink key={link.name} icon={link.icon} url={link.url} name={link.name} />
        ))}
      </div>
    </main>
  );
}

