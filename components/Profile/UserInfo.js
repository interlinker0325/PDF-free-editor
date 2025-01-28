"use client"

// React
import React from 'react'

// Utils
import {INPUT_TYPES} from 'utils/form';

// Shadcn IU
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {CalendarIcon, GraduationCap, Mail, MapPin, Phone, User2, LockIcon} from "lucide-react"

// Components Local
import Publications from 'components/Profile/Publications';

// Styles
import {Switch} from "@mui/material";

let options = {year: 'numeric', month: 'long', day: 'numeric'};

const UserInfo = ({
                    fullname,
                    email,
                    phone,
                    birthdate,
                    residence,
                    updatedAt,
                    gender,
                    level,
                    experience,
                    sharing,
                    isCurrentUserProfile,
                    avatarView,
                    errorState,
                    refAvatar,
                    items,
                    user,
                    ...props
                  }) => {
  console.log({sharing})
  const [activeView, setActiveView] = React.useState(true)
  const [isClient, setIsClient] = React.useState(false);

  let formattedDate = new Date(updatedAt).toLocaleDateString('es-ES', options);

  const handlerEdit = () => setActiveView(!activeView)
  const handlerOnClose = () => {
    handlerEdit()
    props.doCancel()
  }
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  console.log('avatarView', props, avatarView, props?.avatarView)
  return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={avatarView} alt="Profile picture"/>
                    <AvatarFallback>Loading</AvatarFallback>
                  </Avatar>
                  {
                      !activeView && <input
                          className="h-32 w-32 absolute top-0 left-0 m-[auto] opacity-[0]"
                          type='file'
                          name='avatar'
                          id='avatar'
                          ref={refAvatar.avatar}
                          onChange={(e) => props.onChange(e, 'avatar')}/>
                  }
                </div>
                <div className="text-center">
                  {
                    activeView ?
                        <h2 className="text-2xl font-semibold">{fullname}</h2>
                        :
                        <div className="space-y-2 mb-[20px]">
                          <Input
                              disabled={activeView}
                              id="email"
                              value={fullname ?? ''}
                              name={INPUT_TYPES.FULLNAME}
                              onChange={(e) => props.onChange(e, INPUT_TYPES.FULLNAME)}
                          />
                        </div>
                  }
                  <p className="text-sm text-muted-foreground">{props?.role?.name}</p>
                </div>
                {
                 activeView && <Button onClick={handlerEdit} className="w-full">Editar Perfil</Button>
                } <i>Última actualización: {formattedDate}</i>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Información Personal</h3>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="mr-2 inline-block h-4 w-4"/>
                    Correo
                  </Label>
                  <Input
                      disabled={activeView}
                      id="email"
                      value={email ?? ''}
                      name={INPUT_TYPES.EMAIL}
                      onChange={(e) => props.onChange(e, INPUT_TYPES.EMAIL)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="mr-2 inline-block h-4 w-4"/>
                    Número Telefónico
                  </Label>
                  <Input
                      disabled={activeView}
                      value={phone ?? ''}
                      id="phone"
                      type='tel'
                      name={INPUT_TYPES.PHONE}
                      maxLength='8'
                      onChange={(e) => props.onChange(e, INPUT_TYPES.PHONE)}
                      placeholder="Número Telefónico"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">
                    <CalendarIcon className="mr-2 inline-block h-4 w-4"/>
                    Fecha De Nacimiento
                  </Label>
                  <Input
                      disabled={activeView}
                      id="birthdate"
                      value={birthdate}
                      name={INPUT_TYPES.BIRTHDATE}
                      onChange={(e) => props.onChange(e, INPUT_TYPES.BIRTHDATE)}
                      type="date"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    <User2 className="mr-2 inline-block h-4 w-4"/>
                    Género
                  </Label>
                  <Select
                      disabled={activeView}
                      defaultValue={gender ?? ''}
                      onValueChange={(e) => props.onChange({target: {value: e}}, INPUT_TYPES.GENDER)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione género"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residence">
                    <MapPin className="mr-2 inline-block h-4 w-4"/>
                    Residencia
                  </Label>
                  <Input
                      disabled={activeView}
                      value={residence ?? ''}
                      id="residence"
                      placeholder="Ingrese su residencia"
                      name={INPUT_TYPES.RESIDENCE}
                      onChange={(e) => props.onChange(e, INPUT_TYPES.RESIDENCE)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sharing" className="flex items-center">
                    <LockIcon className="mr-2 h-4 w-4"/>
                    Compartir Información con Empresas
                  </Label>
                  <Switch
                      id="sharing"
                      name="sharing"
                      checked={sharing ?? false}
                      onChange={(_, value) => props.onChange(value, 'sharing')}
                      disabled={activeView}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">
                  <GraduationCap className="mr-2 inline-block h-4 w-4"/>
                  Carrera/Universidad/Nivel
                </Label>
                <textarea
                    disabled={activeView}
                    value={level || ''}
                    id="experience"
                    className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describa su experiencia laboral"
                    onChange={(e) => props.onChange(e, INPUT_TYPES.LEVEL)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experiencia Laboral</Label>
                <textarea
                    disabled={activeView}
                    maxLength='200'
                    value={experience || ''}
                    name={INPUT_TYPES.EXPERIENCE}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.EXPERIENCE)}
                    id="experience"
                    className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describa su experiencia laboral"
                />
              </div>

              {
                  !activeView &&
                  <div className="flex justify-end space-x-4">
                    <Button onClick={handlerOnClose} variant="outline">Cancelar</Button>
                    <Button onClick={props.submitUpdateProfile}>Guardar Cambios</Button>
                  </div>
              }

              {
                activeView && isClient &&
                <div className="space-y-2">
                   <h3 className="text-xl font-semibold">Publicaciones</h3>
                  <Publications itemsPerPage={10} items={items} label={"Publicaciones"} user={user}/>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      </main>
  );
};

export default UserInfo;
