import AmenityItem from './AmenityItem'
import type { AmenityGroup as AmenityGroupType, Amenity } from '@/lib/amenities'

type Props = {
  group: AmenityGroupType
  onOpenDetail: (amenity: Amenity) => void
}

export default function AmenityGroup({ group, onOpenDetail }: Props) {
  return (
    <section id={group.id} className="scroll-mt-28">
      {/* Group heading — US-D2, D8 semantic */}
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-stone-900 mb-1">{group.title}</h2>
        {group.subtitle && <p className="text-sm text-stone-500">{group.subtitle}</p>}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {group.amenities.map((amenity) => (
          <AmenityItem key={amenity.id} amenity={amenity} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </section>
  )
}
