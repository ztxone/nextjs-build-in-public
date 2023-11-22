import { StrapiEventData } from "@/types/strapi-custom-types"

import { Eye, EyeOff, ArchiveX, Pencil, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CellActionProps {
  data: StrapiEventData
}

const cellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:text-white">
          <span className="sr-only">Open Actions Menu</span>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="group">
        <span className="flex items-center group-hover:text-white"><Pencil className="h-4 w-4 mr-2 hover:text-white" />Edit Event</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <span className="flex items-center group-hover:text-white"><ArchiveX className="h-4 w-4 mr-2" />Archive Event</span>
        </DropdownMenuItem>        
        {data.attributes.isPublic 
          ? <DropdownMenuItem className="group">
             <span className="flex items-center group-hover:text-white"><Eye className="h-5 w-5 mr-2 hover:text-white" />Published</span>
            </DropdownMenuItem>
          : <DropdownMenuItem className="group">
              <span className="flex items-center group-hover:text-white"><EyeOff className="h-5 w-5 mr-2 hover:text-white" />Unpublished</span>
            </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>   
  )
}

export default cellAction